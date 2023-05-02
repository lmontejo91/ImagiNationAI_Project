import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constants';
import { AuthProvider, AuthContext } from './auth';

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt); //Línea para que no me salga el mismo prompt aleatorio dos veces seguidas.

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.png`);
}

export{
  AuthContext,
  AuthProvider
}