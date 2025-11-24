export const useScheduleHandlers = (formData, handleChange) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Convert time period to specific time
  const getTimeFromPeriod = (period) => {
    switch (period) {
      case 'morning': return '08:00';
      case 'afternoon': return '14:00';
      case 'evening': return '18:00';
      case 'night': return '22:00';
      default: return '08:00';
    }
  };

  // Convert specific time to time period
  const getPeriodFromTime = (time) => {
    if (!time) return 'morning';
    
    const hour = parseInt(time.split(':')[0]);
    
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 24) return 'evening';
    return 'night'; // 0-6
  };

  const handleScheduleFrequencyChange = (event) => {
    const frequency = event.target.value;
    let selectedDays = [];

    // Auto-select days based on frequency type
    switch (frequency) {
      case 'daily':
        selectedDays = [...weekDays]; // All days including Sunday
        break;
      case 'weekdays':
        selectedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']; // Weekdays only
        break;
      case 'weekends':
        selectedDays = ['Sat', 'Sun']; // Weekend days (Saturday and Sunday)
        break;
      case 'weekly':
        selectedDays = []; // Let user choose manually
        break;
      default:
        selectedDays = [];
    }

    // Update both frequency and selected days
    handleChange({ target: { name: 'scheduleFrequency', value: frequency } });
    handleChange({ target: { name: 'scheduleDays', value: selectedDays } });
  };

  const handleTimeOfDayChange = (event) => {
    const timeOfDay = event.target.value;
    const notificationTime = getTimeFromPeriod(timeOfDay);
    
    // Update time of day
    handleChange({ target: { name: 'timeOfDay', value: timeOfDay } });
    
    // Auto-update notification time and enable notifications
    handleChange({ target: { name: 'notificationTime', value: notificationTime } });
    handleChange({ target: { name: 'notificationsEnabled', value: true } });
  };

  const handleNotificationTimeChange = (event) => {
    const notificationTime = event.target.value;
    const timeOfDay = getPeriodFromTime(notificationTime);
    
    // Update notification time
    handleChange({ target: { name: 'notificationTime', value: notificationTime } });
    
    // Auto-update time of day and enable notifications
    handleChange({ target: { name: 'timeOfDay', value: timeOfDay } });
    handleChange({ target: { name: 'notificationsEnabled', value: true } });
  };

  const handleDayToggle = (day) => {
    const currentDays = formData.scheduleDays || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    handleChange({ target: { name: 'scheduleDays', value: newDays } });
  };

  return {
    weekDays,
    handleScheduleFrequencyChange,
    handleTimeOfDayChange,
    handleNotificationTimeChange,
    handleDayToggle
  };
};
