
export type MuscleGroup = 
  | 'Pecho' 
  | 'Espalda' 
  | 'Bíceps' 
  | 'Tríceps' 
  | 'Hombros' 
  | 'Piernas' 
  | 'Cardio' 
  | 'Descanso';

export interface UserProfile {
  name: string;
  email: string;
  password?: string; // En una app real no guardaríamos esto en texto plano
  weight: number;
  height: number;
  goal: 'Ganar músculo' | 'Perder peso' | 'Mantenerse' | 'Fuerza';
}

export interface ExerciseSet {
  id: string;
  weight: number;
  reps: number;
}

export interface LoggedExercise {
  id: string;
  name: string;
  sets: ExerciseSet[];
}

export interface WorkoutSession {
  id: string;
  date: string;
  muscleGroups: MuscleGroup[];
  exercises: LoggedExercise[];
}

export type WeeklyRoutine = Record<string, MuscleGroup[]>;

export const DAYS_OF_WEEK = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
];

export const MUSCLE_GROUPS: MuscleGroup[] = [
  'Pecho',
  'Espalda',
  'Bíceps',
  'Tríceps',
  'Hombros',
  'Piernas',
  'Cardio',
  'Descanso'
];
