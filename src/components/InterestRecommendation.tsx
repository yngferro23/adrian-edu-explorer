import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Programme } from '../types';

interface InterestRecommendationProps {
  programmes: Programme[];
}

const InterestRecommendation: React.FC<InterestRecommendationProps> = ({ programmes }) => {
  const [interest, setInterest] = useState('');
  const [recommendations, setRecommendations] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [minCutoff, setMinCutoff] = useState<number>(0);
  const [maxCutoff, setMaxCutoff] = useState<number>(100);
  const [location, setLocation] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interest.trim()) return;

    setLoading(true);
    setError('');

    try {
      console.log('Making API call to OpenRouter...');
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'University Programme Finder'
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a university course recommendation system. Analyze the user's interests and match them to course categories. Return only the most relevant course categories in a comma-separated list. Categories should be: Medicine and Health Sciences, Technology and Engineering, Business and Economics, Education, Law, Agriculture and Food Sciences, Arts and Humanities, Pure Sciences."
            },
            {
              role: "user",
              content: `Based on this interest: "${interest}", what are the most relevant course categories from the list above? Return only the categories in a comma-separated list.`
            }
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });

      console.log('API Response status:', response.status);
      const data = await response.json();
      console.log('API Response data:', data);

      if (!response.ok) {
        throw new Error(`API Error: ${data.error?.message || 'Unknown error'}`);
      }

      const categories = data.choices[0].message.content.split(',').map((cat: string) => cat.trim().toLowerCase());
      console.log('Extracted categories:', categories);

      // Filter programmes based on matched categories and additional filters
      const matchedProgrammes = programmes.filter(programme => {
        const matchesCategory = categories.some((category: string) => 
          programme.cluster.toLowerCase().includes(category) ||
          programme.programme_name.toLowerCase().includes(category)
        );
        
        const matchesCutoff = programme.cutoff_points >= minCutoff && programme.cutoff_points <= maxCutoff;
        
        const matchesLocation = !location || 
          programme.university_name.toLowerCase().includes(location.toLowerCase()) ||
          programme.location?.toLowerCase().includes(location.toLowerCase());

        return matchesCategory && matchesCutoff && matchesLocation;
      });

      console.log('Matched programmes:', matchedProgrammes);
      setRecommendations(matchedProgrammes);
    } catch (err) {
      console.error('Detailed error:', err);
      setError(`Failed to get recommendations: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Sparkles className="h-5 w-5 mr-2 text-yellow-700" />
        <h2 className="text-lg font-semibold text-gray-800">Find Courses Based on Your Interests</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col space-y-4">
          <textarea
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            placeholder="Tell us what you love (e.g., 'I enjoy solving problems and working with technology')"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
            rows={3}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Cut-off Points</label>
              <input
                type="number"
                value={minCutoff}
                onChange={(e) => setMinCutoff(Number(e.target.value))}
                min="0"
                max="100"
                step="0.1"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Cut-off Points</label>
              <input
                type="number"
                value={maxCutoff}
                onChange={(e) => setMaxCutoff(Number(e.target.value))}
                min="0"
                max="100"
                step="0.1"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city or university name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !interest.trim()}
            className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Finding Recommendations...
              </span>
            ) : (
              'Get Recommendations'
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-600 mb-4 p-3 bg-red-50 rounded-md">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {recommendations.length > 0 && (
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-3">
            Recommended Programmes Based on Your Interests
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((programme) => (
              <div key={programme.programme_code} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800">{programme.programme_name}</h4>
                <p className="text-sm text-gray-600">{programme.university_name}</p>
                <p className="text-sm text-gray-500 mt-1">{programme.cluster}</p>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Cut-off Points: </span>
                  <span className="text-yellow-700">{programme.cutoff_points.toFixed(3)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestRecommendation; 