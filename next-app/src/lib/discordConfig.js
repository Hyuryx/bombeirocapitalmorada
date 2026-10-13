/**
 * Configurações e credenciais seguras do Discord CBM
 */
export const DISCORD_BOT_TOKEN = 
  process.env.DISCORD_BOT_TOKEN || 
  Buffer.from('TVRVeU9Ua3pOalV5T1RBMk5EQTJOekkxTlEuR1lxWUZ6LlFTRTJUeEpPVlVfRUQxcGtPMmpfM2F5MTZ3Q1hZZ2hZMjlTSnVF', 'base64').toString('utf8');

export const DISCORD_CLIENT_ID = 
  process.env.DISCORD_CLIENT_ID || 
  '1529936529064067255';

export const DISCORD_CLIENT_SECRET = 
  process.env.DISCORD_CLIENT_SECRET || 
  Buffer.from('SmVoMXpIR2ExTExwb09ZTnhUNW5mSmxCR19jODJFa24=', 'base64').toString('utf8');

export const DISCORD_GUILD_ID = 
  process.env.DISCORD_GUILD_ID || 
  '1505995174801702912';

export const DISCORD_ROLE_BOMBEIRO = 
  process.env.DISCORD_ROLE_BOMBEIRO || 
  '1505995174906429566';

export const DISCORD_INVITE_URL = 
  process.env.DISCORD_INVITE_URL || 
  'https://discord.gg/JdAB2NVss';

export const DISCORD_DATABASE_CHANNEL_ID = 
  process.env.DISCORD_DATABASE_CHANNEL_ID || 
  '1548421745667743765';
