import { Container } from '@/components/layout/Container'
import { TreasureBrowser } from '@/components/treasure/TreasureBrowser'

export default function TreasureBoxPage() {
  return (
    <Container className="mt-16 sm:mt-28">
      <div className="mx-auto max-w-2xl lg:max-w-5xl">
        <header className="mb-12">
          <p className="section-kicker">Treasure Box</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.15]">
            百川驿
          </h1>
          <p className="section-lead mt-4">万维网罗，百宝归藏。</p>
        </header>
        <TreasureBrowser />
      </div>
    </Container>
  )
}
