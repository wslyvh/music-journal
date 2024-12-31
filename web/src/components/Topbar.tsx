import { Button, Drawer, Menu, Navbar } from "react-daisyui";
import { Menu as MenuIcon, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export const Topbar = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onWindowScroll = () => {
      setAtTop(window.pageYOffset < 30);
    };
    window.addEventListener("scroll", onWindowScroll);
    onWindowScroll();
  }, []);

  return (
    <>
      <div
        id="navbar-wrapper"
        className={`container fixed inset-x-0 top-0 z-[60] backdrop-blur-sm transition-all duration-500 ${!atTop ? "border top-0 xl:mt-4 mt-0 xl:rounded-full z-20 bg-base-100 lg:bg-opacity-95 border-base-content/10 " : "border-base-content/10"}`}
      >
        <div className="">
          <Navbar className="px-0">
            <Navbar.Start className="gap-2">
              <div className="flex-none lg:hidden">
                <Drawer
                  open={drawerOpened}
                  onClickOverlay={() => setDrawerOpened(!drawerOpened)}
                  side={
                    <Menu className="min-h-full w-80 gap-2 bg-base-100 p-4 text-base-content">
                      <Menu.Item className="font-medium">
                        <a href="/">
                          <img
                            src={logo}
                            alt="Music Journal Logo"
                            className="h-8"
                          />
                        </a>
                      </Menu.Item>

                      <Menu.Item
                        className="font-medium"
                        onClick={() => setDrawerOpened(false)}
                      >
                        <a href="#home">Home</a>
                      </Menu.Item>
                      <Menu.Item
                        className="font-medium"
                        onClick={() => setDrawerOpened(false)}
                      >
                        <a href="#features">Features</a>
                      </Menu.Item>

                      <Menu.Item className="font-medium">
                        <details
                          className="w-full [&>summary::marker]:text-base-content [&>summary::marker]:float-right"
                          open
                        >
                          <summary className="flex justify-between items-center">
                            Resources
                          </summary>
                          <ul className="p-2 mt-2">
                            <li>
                              <a
                                href="/resources/music-practice-journal"
                                onClick={() => setDrawerOpened(false)}
                              >
                                Music Practice Journal
                              </a>
                            </li>
                          </ul>
                        </details>
                      </Menu.Item>

                      <a
                        href="#download"
                        onClick={() => setDrawerOpened(false)}
                      >
                        <Button size={"sm"} color={"primary"}>
                          Coming Soon
                        </Button>
                      </a>
                    </Menu>
                  }
                >
                  <Button
                    shape="square"
                    color="ghost"
                    onClick={() => setDrawerOpened(true)}
                  >
                    <MenuIcon className="inline-block text-xl" />
                  </Button>
                </Drawer>
              </div>

              <a href="/">
                <img src={logo} alt="Music Journal Logo" className="h-8" />
              </a>
            </Navbar.Start>

            <Navbar.End className="hidden lg:flex w-full">
              <Menu horizontal size="sm" className="gap-2 px-1 items-center">
                <Menu.Item className="font-medium">
                  <a href="/">Home</a>
                </Menu.Item>
                <Menu.Item className="font-medium">
                  <a href="/#features">Features</a>
                </Menu.Item>
                <div className="dropdown dropdown-hover dropdown-end">
                  <Menu.Item className="font-medium" tabIndex={0}>
                    <span className="flex items-center gap-1">
                      Resources
                      <ChevronDown size={16} />
                    </span>
                  </Menu.Item>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a href="/resources/music-practice-journal">
                        Music Practice Journal
                      </a>
                    </li>
                  </ul>
                </div>
                <a href="/#download">
                  <Button size={"sm"} color={"primary"}>
                    Coming Soon
                  </Button>
                </a>
              </Menu>
            </Navbar.End>
          </Navbar>
        </div>
      </div>
    </>
  );
};
