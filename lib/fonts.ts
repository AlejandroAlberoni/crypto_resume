import { Poppins, Montserrat, Inter } from 'next/font/google';

export const poppins = Poppins({weight: ["400"], subsets: ["latin"]});

export const montserrat = Montserrat({weight: ["200","400","600"], subsets: ["latin"]});

export const inter = Inter({weight: ["500"], subsets: ["latin"]});