/**
 * Goal model for Firestore data
 */
class Goal {
  constructor(data = {}) {
    this.id = data.id || null;
    this.text = data.text || "";
    this.order = data.order ?? 0;
    this.completed = data.completed || false;
    this.createdAt = data.createdAt || new Date();
  }

  /**
   * Convert Goal instance to plain object for Firestore
   * @returns {Object} Plain object representation
   */
  toFirestore() {
    return {
      id: this.id,
      text: this.text,
      order: this.order,
      completed: this.completed,
      createdAt: this.createdAt,
    };
  }

  /**
   * Create Goal instance from Firestore data
   * @param {Object} data - Firestore document data
   * @returns {Goal} Goal instance
   */
  static fromFirestore(data) {
    return new Goal({
      id: data.id,
      text: data.text,
      order: data.order,
      completed: data.completed,
      createdAt: data.createdAt?.toDate?.() || data.createdAt,
    });
  }
}

export default Goal;
