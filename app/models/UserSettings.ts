import { Instance, SnapshotOut, types } from "mobx-state-tree"

// Define a model for individual tracking category settings
const TrackingSettings = types
  .model("TrackingSettings")
  .props({
    enabled: types.boolean, // Indicates whether tracking is enabled for the category
    lastUpdated: types.optional(types.Date, () => new Date()), // Date when the setting was last updated
  })

// Define the main user settings model
export const UserSettingsModel = types
  .model("UserSettings")
  .props({
    notificationsAllowed: types.optional(types.boolean, false), // Global notification permission granted by the user
    trackingAllowed: types.optional(types.boolean, false), // Global tracking permission granted by the user
    news: types.optional(TrackingSettings, { enabled: false }), // Tracking settings for the news category
    updates: types.optional(TrackingSettings, { enabled: false }), // Tracking settings for the updates category
    promotions: types.optional(TrackingSettings, { enabled: false }), // Tracking settings for the promotions category
  })
  .actions((self) => ({
    // Action to set the global notification permission
    setNotificationsAllowed(allowed: boolean) {
      self.notificationsAllowed = allowed
    },
    // Action to set the global tracking permission
    setTrackingAllowed(allowed: boolean) {
      self.trackingAllowed = allowed
    },
    // Action to toggle tracking for the news category
    toggleNewsTracking() {
      self.news.enabled = !self.news.enabled
      self.news.lastUpdated = new Date()
    },
    // Action to toggle tracking for the updates category
    toggleUpdatesTracking() {
      self.updates.enabled = !self.updates.enabled
      self.updates.lastUpdated = new Date()
    },
    // Action to toggle tracking for the promotions category
    togglePromotionsTracking() {
      self.promotions.enabled = !self.promotions.enabled
      self.promotions.lastUpdated = new Date()
    },
  }))

// TypeScript interface for type safety and intellisense
export interface UserSettings extends Instance<typeof UserSettingsModel> {}
export interface UserSettingsSnapshot extends SnapshotOut<typeof UserSettingsModel> {}