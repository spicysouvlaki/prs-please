import imgDwayne from '../assets/avatars/dwayne-krebsbach.jpg'
import imgRhonda from '../assets/avatars/rhonda-papadimitriou.jpg'
import imgWaifu2402 from '../assets/avatars/waifu-2402.jpg'
import imgBrett from '../assets/avatars/brett-fusselman.jpg'
import imgWaifu2405 from '../assets/avatars/waifu-2405.jpg'
import imgKip from '../assets/avatars/kip-schlueter.jpg'
import imgGarrett from '../assets/avatars/garrett-winklebauer.jpg'
import imgCraig from '../assets/avatars/craig-pumphrey.jpg'
import imgGlen from '../assets/avatars/glen-butterworth.jpg'
import imgDoug from '../assets/avatars/doug-floomph.jpg'
import imgRuss from '../assets/avatars/russ-vanderhoeven.jpg'
import imgBrittany from '../assets/avatars/brittany-schlotterbeck.jpg'
import imgNorm from '../assets/avatars/norm-plunkettforth.jpg'
import imgPriya from '../assets/avatars/priya-oncall.jpg'
import imgChad from '../assets/avatars/chad.jpg'
import imgTanvi from '../assets/avatars/tanvi.jpg'
import imgKaren from '../assets/avatars/karen-staffeng.jpg'
import imgGrowthPm from '../assets/avatars/growth-pm.jpg'
import imgBill from '../assets/avatars/bill-lumbergh.jpg'

// Keys cover: NPC ids, NPC full names, Slack sender IDs, and DM display names.
// Omitted entries fall back to colored initials.
const AVATARS: Record<string, string> = {
  // NPC ids
  'dwayne-krebsbach': imgDwayne,
  'rhonda-papadimitriou': imgRhonda,
  'skyler-tinklenberg': imgWaifu2402,
  'brett-fusselman': imgBrett,
  'kip-schlueter': imgKip,
  'garrett-winklebauer': imgGarrett,
  'craig-pumphrey': imgCraig,
  'marcy-thistlewaite': imgWaifu2405,
  'glen-butterworth': imgGlen,
  'doug-floomph': imgDoug,
  'russ-vanderhoeven': imgRuss,
  'brittany-schlotterbeck': imgBrittany,
  'norm-plunkettforth': imgNorm,

  // NPC full names (used in stack-rank and as PR authors)
  'Dwayne Krebsbach': imgDwayne,
  'Rhonda Papadimitriou': imgRhonda,
  'Skyler Tinklenberg': imgWaifu2402,
  'Brett Fusselman': imgBrett,
  'Kip Schlueter': imgKip,
  'Garrett Winklebauer': imgGarrett,
  'Craig Pumphrey': imgCraig,
  'Marcy Thistlewaite': imgWaifu2405,
  'Glen Butterworth': imgGlen,
  'Doug Floomph': imgDoug,
  'Russ Vanderhoeven': imgRuss,
  'Brittany Schlotterbeck': imgBrittany,
  'Norm Plunkettforth': imgNorm,

  // Slack sender IDs
  'kip': imgKip,
  'craig': imgCraig,
  'priya-oncall': imgPriya,
  'chad': imgChad,
  'tanvi': imgTanvi,
  'karen_staffeng': imgKaren,
  'growth-pm': imgGrowthPm,
  'bill_lumbergh': imgBill,

  // DM display names (after dmName strips "DM: ")
  'Kip': imgKip,
  'Craig': imgCraig,
  'Lumbergh + Rachel': imgBill,
}

export function getAvatarUrl(key: string): string | undefined {
  return AVATARS[key]
}
