import { storageService } from './storageService.js';
import { delay, ApiError } from './api.js';

export const categoryService = {
  async getCategories() {
    await delay(60);
    const categories = storageService.getCategories();
    const courses = storageService.getCourses();

    // Dynamically calculate actual course counts
    return categories.map(cat => ({
      ...cat,
      courseCount: courses.filter(c => c.category.toLowerCase() === cat.name.toLowerCase()).length
    }));
  },

  async createCategory(catData, adminUser) {
    await delay(100);
    const categories = storageService.getCategories();
    if (categories.some(c => c.name.toLowerCase() === catData.name.trim().toLowerCase())) {
      throw new ApiError('Category with this name already exists', 400);
    }

    const newCategory = {
      id: `cat-${Date.now()}`,
      name: catData.name.trim(),
      slug: catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: catData.description || '',
      icon: catData.icon || 'Folder',
      courseCount: 0
    };

    storageService.setCategories([...categories, newCategory]);

    if (adminUser) {
      storageService.addActivity({
        user: adminUser.name,
        role: 'ADMIN',
        action: 'Category Created',
        details: `Created academic taxonomy: ${newCategory.name}`,
        type: 'success'
      });
    }

    return newCategory;
  },

  async updateCategory(id, updates, adminUser) {
    await delay(100);
    const categories = storageService.getCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new ApiError('Category not found', 404);
    }

    const updated = { ...categories[index], ...updates };
    categories[index] = updated;
    storageService.setCategories(categories);

    if (adminUser) {
      storageService.addActivity({
        user: adminUser.name,
        role: 'ADMIN',
        action: 'Category Updated',
        details: `Updated category "${updated.name}"`,
        type: 'info'
      });
    }

    return updated;
  },

  async deleteCategory(id, adminUser) {
    await delay(100);
    const categories = storageService.getCategories();
    const cat = categories.find(c => c.id === id);
    if (!cat) {
      throw new ApiError('Category not found', 404);
    }

    const filtered = categories.filter(c => c.id !== id);
    storageService.setCategories(filtered);

    if (adminUser) {
      storageService.addActivity({
        user: adminUser.name,
        role: 'ADMIN',
        action: 'Category Deleted',
        details: `Removed taxonomy "${cat.name}"`,
        type: 'warning'
      });
    }

    return true;
  }
};
