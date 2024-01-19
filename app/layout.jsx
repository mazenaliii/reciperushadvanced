import './globals.css'
import Nav from '../components/Main page/Nav';
import LoginProvider from '../components/loginProvider/loginProvider';

export const metadata = {
  title: 'RecipeRush',
  description: '...',
}
function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>
        <div className='gradient1'>
          <LoginProvider>
            <Nav />
            <main>
              {children}
            </main>
          </LoginProvider>
        </div>

      </body>
    </html>
  )
}


export default RootLayout;