import { AniIndex } from './pages/AniIndex'
import { AniFooter } from './cmps/AniFooter'
import { AniHeader } from './cmps/AniHeader'

export function RootCmp() {
  return (
    <section className="main-container">
      <AniHeader />
      <main>
        <AniIndex />
      </main>
      <AniFooter />
    </section>
  )
}
