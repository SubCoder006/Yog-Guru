// In the diet plan component
const generateAIDietPlan = async (preferences) => {
  const prompt = `Create a personalized ${preferences.dietType} diet plan for someone with ${preferences.goals} goals, ${preferences.activityLevel} activity level, avoiding ${preferences.allergies}. Include 7 days of meals with calories and ingredients.`;
  
  // Call your preferred AI API here
  const response = await fetch(`/plans/diet/${dietId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, preferences })
  });
  
  return await response.json();
};