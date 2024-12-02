import { Button, Drawer, Menu, Navbar } from "react-daisyui";
import { Menu as MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CONFIG } from "@/utils/config";

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
                        <a
                          href="index.html"
                          className="text-brand-gradient text-2xl font-bold tracking-tighter"
                        >
                          {CONFIG.SITE_NAME}
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
                      {/* <Menu.Item
                        className="font-medium"
                        onClick={() => setDrawerOpened(false)}
                      >
                        <a href="#organize">Organize</a>
                      </Menu.Item>
                      <Menu.Item className="font-medium" onClick={() => setDrawerOpened(false)}>
                        <a href="#testimonial">Testimonial</a>
                      </Menu.Item>
                      <Menu.Item className="font-medium" onClick={() => setDrawerOpened(false)}>
                        <a href="#faq">FAQ</a>
                      </Menu.Item> */}
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

              <a
                href="#"
                className="text-brand-gradient text-2xl font-bold tracking-tighter"
              >
                {CONFIG.SITE_NAME}
              </a>
            </Navbar.Start>

            <Navbar.End className="hidden lg:flex w-full">
              <Menu horizontal size="sm" className="gap-2 px-1 items-center">
                <Menu.Item className="font-medium">
                  <a href="#home">Home</a>
                </Menu.Item>
                <Menu.Item className="font-medium">
                  <a href="#features">Features</a>
                </Menu.Item>
                {/* <Menu.Item className="font-medium">
                  <a href="#organize">Organize</a>
                </Menu.Item> */}
                <a href="#download">
                  <Button size={"sm"} color={"primary"}>
                    Coming Soon
                  </Button>
                </a>
                {/* <Menu.Item className="font-medium">
                  <a href="#testimonial">Testimonial</a>
                </Menu.Item>
                <Menu.Item className="font-medium">
                  <a href="#faq">FAQ</a>
                </Menu.Item>
                <a
                  href="https://daisyui.lemonsqueezy.com/checkout/buy/71f032e3-1a23-4b79-b74e-130ada4899f2"
                  target="_blank"
                >
                  <Button size={"sm"} color={"primary"}>
                    Purchase Now
                  </Button>
                </a> */}
              </Menu>
            </Navbar.End>
          </Navbar>
        </div>
      </div>
    </>
  );
};
