// vite.config.ts
import UnoCSS from "unocss/vite";
import presetUno from "@unocss/preset-uno";
import presetIcons from '@unocss/preset-icons';
import presetWebFonts from '@unocss/preset-web-fonts'
export default {
    plugins: [
        UnoCSS( {
            presets:[
                presetUno(),
                presetIcons({
                    /* options */
                }),
                presetWebFonts({
                    provider: 'google', // default provider
                    fonts: {
                        // these will extend the default theme
                        sans: 'Noto Savs:400,700',
                        mono: ['Fira Code', 'Fira Mono:400,700'],
                        // custom ones
                        lobster: 'Lobster',
                        lato: [
                            {
                                name: 'Noto Sans',
                                weights: ['400', '700'],
                                italic: false,
                            },
                            {
                                name: 'sans-serif',
                                provider: 'none',
                            },
                        ],
                    },
                }),

            ],
            rules: [
                // your custom rules
            ],
        }),
    ],
}