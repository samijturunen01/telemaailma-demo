/**
 * "Kanavat" – the company's business areas, presented as stations on the
 * homepage tuner. Copy is condensed from the company's own website.
 */
export type ChannelId = 'aurinko' | 'antennit' | 'ajoneuvot' | 'maasto' | 'myymala'

export interface Channel {
  id: ChannelId
  number: string
  label: string
  title: string
  text: string
  to: string
  readout: string
  /** Visual shown in the tuner screen. */
  visual: 'photo-solar' | 'waves' | 'route' | 'contours' | 'photo-board'
}

export const channels: Channel[] = [
  {
    id: 'aurinko',
    number: '01',
    label: 'Aurinko',
    title: 'SolarWorks-aurinkosähkö',
    text: 'Avaimet käteen -järjestelmät Suomen sääoloihin sopivilla paneeleilla ja itävaltalaisilla Fronius-inverttereillä. Myös tarkastukset ja testimittaukset.',
    to: '/aurinkosahko',
    readout: 'Fronius · paneelit · mittaukset',
    visual: 'photo-solar',
  },
  {
    id: 'antennit',
    number: '02',
    label: 'Antennit',
    title: 'Antenni- ja tieto­verkko­asennukset',
    text: 'TV-, satelliitti- ja 4G-antennit, kuitu ja lähiverkot omakotitaloihin, rivitaloihin ja taloyhtiöihin – uusiin ja vanhoihin kohteisiin.',
    to: '/palvelut/antenniasennukset',
    readout: 'TV · SAT · LTE · kuitu',
    visual: 'waves',
  },
  {
    id: 'ajoneuvot',
    number: '03',
    label: 'Ajoneuvot',
    title: 'Ajoneuvo- ja työ­kone­asennukset',
    text: 'Paikannuslaitteet, VHF- ja LA-puhelimet sekä ajoneuvotietokoneet autoihin, kuorma-autoihin, metsäkoneisiin ja veneisiin – tarvittaessa maastossa.',
    to: '/palvelut/ajoneuvoasennukset',
    readout: 'VHF · LA · paikannus',
    visual: 'route',
  },
  {
    id: 'maasto',
    number: '04',
    label: 'Maasto',
    title: 'Metsästys ja maasto',
    text: 'Koiratutkat, paikannuslaitteet sekä riista- ja valvontakamerat käyttövalmiiksi asennettuina. Lisenssit, päivitykset ja vuosihuollot.',
    to: '/tuotteet/metsastys-ja-maasto',
    readout: 'Ultracom · Tracker · Garmin',
    visual: 'contours',
  },
  {
    id: 'myymala',
    number: '05',
    label: 'Myymälä',
    title: 'Puhelimet, tietokoneet ja tarvikkeet',
    text: 'Älypuhelimet, kestävät IP68-puhelimet, kannettavat ja tarvikkeet. Lähes minkä tahansa IT-laitteen saamme seuraavaksi arkipäiväksi.',
    to: '/tuotteet',
    readout: 'Puhelimet · IT · tarvikkeet',
    visual: 'photo-board',
  },
]
