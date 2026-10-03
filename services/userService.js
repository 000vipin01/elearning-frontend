import { storageService } from './storageService.js';
import { delay, ApiError } from './api.js';

export const userService = {
  async getUsers(filters = {}) {
    await delay(100);
    let list = storageService.getUsers();

    if (filters.role && filters.role !== 'ALL') {
      list = list.filter(u => u.role === filters.role);
    }

    if (filters.status && filters.status !== 'ALL') {
      list = list.filter(u => u.status === filters.status);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.title && u.title.toLowerCase().includes(q))
      );
    }

    return list;
  },

  async getUserById(id) {
    await delay(80);
    const users = storageService.getUsers();
    const user = users.find(u => u.id === id);
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    return user;
  },

  async createUser(userData, adminUser) {
    await delay(120);
    const users = storageService.getUsers();
    const cleanEmail = userData.email.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new ApiError('A user with this email address already exists.', 409);
    }

    const newUser = {
      id: `user-${userData.role.toLowerCase().slice(0, 4)}-${Date.now()}`,
      name: userData.name.trim(),
      email: cleanEmail,
      password: userData.password || 'welcome123',
      role: userData.role,
      title: userData.title || `${userData.role} User`,
      avatar: userData.avatar || `https://images.unsplash.com/photo-${userData.role === 'INSTRUCTOR' ? '1507003211169-0a1dd7228f2d' : '1535713875002-d1d0cf377fde'}?w=200&auto=format&fit=crop&q=80`,
      bio: userData.bio || '',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      expertise: userData.expertise || []
    };

    const updated = [newUser, ...users];
    storageService.setUsers(updated);

    if (adminUser) {
      storageService.addActivity({
        user: adminUser.name,
        role: adminUser.role,
        action: 'User Created',
        details: `Created new ${newUser.role.toLowerCase()} account for ${newUser.name}`,
        type: 'success'
      });
    }

    return newUser;
  },

  async updateUser(id, updates, adminUser) {
    await delay(100);
    const users = storageService.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new ApiError('User not found', 404);
    }

    const updatedUser = { ...users[index], ...updates };
    users[index] = updatedUser;
    storageService.setUsers(users);

    if (adminUser) {
      storageService.addActivity({
        user: adminUser.name,
        role: adminUser.role,
        action: 'User Modified',
        details: `Updated account details for ${updatedUser.name}`,
        type: 'info'
      });
    }

    return updatedUser;
  },

  async toggleUserStatus(id, adminUser) {
    const user = await this.getUserById(id);
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    return this.updateUser(id, { status: newStatus }, adminUser);
  },

  async deleteUser(id, adminUser) {
    await delay(100);
    const users = storageService.getUsers();
    const target = users.find(u => u.id === id);
    if (!target) {
      throw new ApiError('User not found', 404);
    }

    if (target.role === 'ADMIN' && users.filter(u => u.role === 'ADMIN').length <= 1) {
      throw new ApiError('Cannot delete the last administrative account.', 400);
    }

    const filtered = users.filter(u => u.id !== id);
    storageService.setUsers(filtered);

    // Remove user's enrollments
    const enrollments = storageService.getEnrollments().filter(e => e.userId !== id);
    storageService.setEnrollments(enrollments);

    if (adminUser) {
      storageService.addActivity({
        user: adminUser.name,
        role: adminUser.role,
        action: 'User Deleted',
        details: `Permanently removed user account: ${target.name} (${target.email})`,
        type: 'warning'
      });
    }

    return true;
  },

  async getInstructors() {
    return this.getUsers({ role: 'INSTRUCTOR' });
  },

  async getStudents() {
    return this.getUsers({ role: 'STUDENT' });
  }
};
