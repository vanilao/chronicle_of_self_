export const useTemplateSelection = (onTemplateSelect, onClose) => {
  const handleTemplateSelect = (template, activeTab) => {
    if (activeTab === 1) {
      // Community templates - show coming soon message
      alert('Community templates coming soon! 🚀');
      return;
    }
    
    // Convert template to habit data format
    const habitData = {
      name: template.name,
      description: template.description,
      category: template.category,
      difficulty: template.difficulty,
      frequencyType: template.frequency === 'Daily' ? 'Daily' : 'Weekly',
      selectedDays: template.frequency === 'Daily' ? [] : ['Mon', 'Wed', 'Fri'], // Default for weekly
      targetCompletions: template.targetCompletions,
      customIcon: '', // Could add default icons later
      useCustomIcon: false,
      iconColor: template.color,
      notificationsEnabled: true,
      notificationTime: '09:00'
    };

    onTemplateSelect(habitData);
    onClose();
  };

  return { handleTemplateSelect };
};
