import { Route, Routes } from 'react-router-dom'

import { Sidebar } from './components/sidebar/sidebar'
import { APP_LINK_URLS, EAppPage } from './constants/link-urls'
import { CharacterDetails } from './pages/character-details'
import { Characters } from './pages/characters'
import { Spells } from './pages/spells'
import styles from './App.module.css'

const App = () => (
  <div className={styles.layout}>
    <Sidebar className={styles.sidebar} />

    <main className={styles.content}>
      <Routes>
        <Route path={APP_LINK_URLS[EAppPage.ROOT]} element={<Characters />} />
        <Route path={APP_LINK_URLS[EAppPage.SPELLS]} element={<Spells />} />
        <Route path={APP_LINK_URLS[EAppPage.CHARACTERS]} element={<Characters />} />
        <Route path={`${APP_LINK_URLS[EAppPage.CHARACTERS]}/:id`} element={<CharacterDetails />} />
      </Routes>
    </main>
  </div>
);

export default App;
