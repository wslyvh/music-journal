import { Dropdown, Menu, useTheme } from 'react-daisyui'
import { Airplay, ChevronUpIcon, Moon, Sun } from 'lucide-react'

export const ThemeToggler = () => {
  const { setTheme } = useTheme()

  return (
    <div className="fixed bottom-5 end-5 z-10 flex flex-col items-center">
      <Dropdown className="dropdown-end dropdown-top">
        <Dropdown.Toggle>
          Theme
          <ChevronUpIcon size={12}/>
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-52">
          <Menu size={'xs'}>
            <Menu.Item onClick={() => setTheme('system')}>
              <div className="flex gap-3 text-sm">
                <Airplay className="h-5" />
                System
              </div>
            </Menu.Item>
            <Menu.Item onClick={() => setTheme('light')}>
              <div className="flex gap-3 text-sm">
                <Sun className="h-5" />
                Light
              </div>
            </Menu.Item>
            <Menu.Item onClick={() => setTheme('dark')}>
              <div className="flex gap-3 text-sm">
                <Moon className="h-5" />
                Dark
              </div>
            </Menu.Item>
          </Menu>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
