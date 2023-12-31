import './globals.css'
import Nav from '../components/Main page/Nav';
import Provider from '@/components/Main page/Provider';

export const metadata = {
  title: 'RecipeRush',
  description: '...',
}
function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>

        <Provider>
          <Nav />
              <main>
                 {children}
              </main>
        </Provider>


      </body>
    </html>
  )
}


export default RootLayout;