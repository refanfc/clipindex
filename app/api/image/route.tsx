import { ImageResponse } from 'next/og'
import axios from 'axios'
import * as cheerio from 'cheerio'

export const runtime = 'edge'

export async function GET() {
  const url = 'https://www.theclip.fun/launchpad'

  try {
    const res = await axios.get(url)
    const $ = cheerio.load(res.data)

    const tokens = []

    $('.css-1i6msoi').each((_, el) => {
      const name = $(el).find('.chakra-text').eq(0).text()
      const symbol = $(el).find('.chakra-text').eq(1).text()

      if (name && symbol) {
        tokens.push({ name, symbol })
      }
    })

    const top3 = tokens.slice(0, 3)
    const lines = top3.map(t => `- ${t.name} (${t.symbol})`)

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
            background: 'black',
            color: 'white',
            width: '100%',
            height: '100%',
            padding: '60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <img
            src="https://www.theclip.fun/favicon.ico"
            width={100}
            height={100}
            alt="logo"
            style={{ borderRadius: 20, marginBottom: 20 }}
          />
          <div style={{ fontSize: 48 }}>🚀 Token Baru</div>
          <div style={{ marginTop: '30px', lineHeight: '1.6' }}>
            {lines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: 'black',
            color: 'red',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          ❌ Gagal mengambil data
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
}