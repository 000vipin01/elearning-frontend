import { storageService } from './storageService.js';
import { delay, ApiError } from './api.js';

export const authService = {
  async login(email, password) {
    await delay(120);
    const users = storageService.getUsers();
    const cleanEmail = email.trim().toLowerCase();
    
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      throw new ApiError('No account found with this email address.', 401);
    }

    if (user.password !== password) {
      throw new ApiError('Invalid password credentials provided.', 401);
    }

    if (user.status === 'inactive' || user.status === 'suspended') {
      throw new ApiError('Your account has been deactivated. Contact an administrator.', 403);
    }

    // Persist current session
    const sessionUser = { ...user };
    delete sessionUser.password;
    storageService.setAuthSession(sessionUser);

    storageService.addActivity({
      user: user.name,
      role: user.role,
      action: 'Session Login',
      details: `User logged into ${user.role.toLowerCase()} console`,
      type: 'info'
    });

    return sessionUser;
  },

  async register({ name, email, password, role = 'STUDENT', title = '' }) {
    await delay(150);
    const users = storageService.getUsers();
    const cleanEmail = email.trim().toLowerCase();

    if (!name || !email || !password) {
      throw new ApiError('Name, email, and password are required fields.', 400);
    }

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new ApiError('An account with this email address already exists.', 409);
    }

    const newUser = {
      id: `user-${role.toLowerCase().slice(0, 4)}-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password,
      role: role.toUpperCase(),
      title: title || (role === 'STUDENT' ? 'Student Learner' : role === 'INSTRUCTOR' ? 'Course Instructor' : 'Administrator'),
      avatar: `https://images.unsplash.com/photo-${role === 'STUDENT' ? '1535713875002-d1d0cf377fde' : '1534528741775-53994a69daeb'}?w=200&auto=format&fit=crop&q=80`,
      bio: '',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      expertise: role === 'INSTRUCTOR' ? ['General Education'] : []
    };

    const updatedUsers = [...users, newUser];
    storageService.setUsers(updatedUsers);

    const sessionUser = { ...newUser };
    delete sessionUser.password;
    storageService.setAuthSession(sessionUser);

    storageService.addActivity({
      user: newUser.name,
      role: newUser.role,
      action: 'New Registration',
      details: `Registered as ${newUser.role}`,
      type: 'success'
    });

    return sessionUser;
  },

  async logout() {
    await delay(50);
    const session = storageService.getAuthSession();
    if (session) {
      storageService.addActivity({
        user: session.name,
        role: session.role,
        action: 'Session Logout',
        details: 'User cleanly logged out',
        type: 'info'
      });
    }
    storageService.setAuthSession(null);
    return true;
  },

  getCurrentUser() {
    return storageService.getAuthSession();
  },

  async updateProfile(userId, updates) {
    await delay(100);
    const users = storageService.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) {
      throw new ApiError('User not found', 404);
    }

    const updated = { ...users[index], ...updates };
    users[index] = updated;
    storageService.setUsers(users);

    const session = storageService.getAuthSession();
    if (session && session.id === userId) {
      const updatedSession = { ...session, ...updates };
      delete updatedSession.password;
      storageService.setAuthSession(updatedSession);
    }

    storageService.addActivity({
      user: updated.name,
      role: updated.role,
      action: 'Profile Updated',
      details: 'Updated account profile details',
      type: 'info'
    });

    return updated;
  }
};
