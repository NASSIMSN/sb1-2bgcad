import React, { useState } from 'react';
import { Dumbbell, Settings } from 'lucide-react';
import WorkoutDay from './components/WorkoutDay';
import Tips from './components/Tips';
import DailyGoals from './components/DailyGoals';
import Timer from './components/Timer';
import WorkoutEditor from './components/WorkoutEditor';

const initialWorkouts = {
  'Lundi': [
    { name: 'Développé couché', sets: '4 x 8-10', completed: false },
    { name: 'Rowing haltère', sets: '3 x 12', completed: false },
    { name: 'Élévations latérales', sets: '3 x 15', completed: false },
  ],
  'Mardi': [
    { name: 'Squats', sets: '4 x 10', completed: false },
    { name: 'Fentes', sets: '3 x 12/jambe', completed: false },
    { name: 'Extensions jambes', sets: '3 x 15', completed: false },
  ],
  'Mercredi': [
    { name: 'Tractions', sets: '4 x max', completed: false },
    { name: 'Curl biceps', sets: '3 x 12', completed: false },
    { name: 'Gainage', sets: '3 x 45s', completed: false },
  ],
  'Jeudi': [
    { name: 'Repos actif', sets: '30min cardio', completed: false },
    { name: 'Étirements', sets: '20min', completed: false },
  ],
  'Vendredi': [
    { name: 'Développé militaire', sets: '4 x 8-10', completed: false },
    { name: 'Dips', sets: '3 x max', completed: false },
    { name: 'Face pull', sets: '3 x 15', completed: false },
  ],
  'Samedi': [
    { name: 'Deadlift', sets: '4 x 8', completed: false },
    { name: 'Hip thrust', sets: '3 x 12', completed: false },
    { name: 'Mollets', sets: '4 x 20', completed: false },
  ],
  'Dimanche': [
    { name: 'Repos complet', sets: '-', completed: false },
  ],
};

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleExercise = (day: string, index: number) => {
    setWorkouts(prev => ({
      ...prev,
      [day]: prev[day].map((exercise, i) => 
        i === index ? { ...exercise, completed: !exercise.completed } : exercise
      )
    }));
  };

  const handleUpdateWorkouts = (newWorkouts: typeof initialWorkouts) => {
    setWorkouts(newWorkouts);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 rounded-b-3xl shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3">
            <Dumbbell className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Programme Musculation</h1>
          </div>
          <p className="text-center mt-2 text-blue-100">
            Votre guide personnalisé pour une transformation physique
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="bg-white rounded-3xl shadow-md p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Planning Hebdomadaire</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                <Settings size={18} />
                <span>Éditer</span>
              </button>
            </div>
            
            {isEditing ? (
              <WorkoutEditor workouts={workouts} onSave={handleUpdateWorkouts} onCancel={() => setIsEditing(false)} />
            ) : (
              <div className="grid grid-cols-7 gap-4 overflow-x-auto pb-4">
                {Object.entries(workouts).map(([day, exercises]) => (
                  <WorkoutDay
                    key={day}
                    day={day}
                    exercises={exercises}
                    onToggleExercise={handleToggleExercise}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <DailyGoals />
                <Timer />
              </div>
            </div>
            <div className="lg:col-span-2">
              <Tips />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 rounded-t-3xl mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Consultez toujours un professionnel avant de commencer un nouveau programme d'entraînement
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;