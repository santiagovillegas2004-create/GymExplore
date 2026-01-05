
import { UserProfile } from "./types";

const SUPABASE_URL = "https://bierrdtyqsapboxjsjyx.supabase.co"; 
const SUPABASE_KEY = "sb_publishable_0Ahgx79iwZzbohQ_aCKzlg_B4Hsuuj_"; 

export const syncUserToDatabase = async (profile: UserProfile): Promise<boolean> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/GymExplore`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        "Correo electrónico": profile.email,
        "Nombre": profile.name,
        "Objetivo": profile.goal,
        "Peso": profile.weight,
        "Altura": profile.height
      })
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};
