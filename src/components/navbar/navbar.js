import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/shadcnui/navigation-menu";
import Link from "next/link"

export default function Navbar() {

  const navbarLinks = [
    {
      title: "link1",
      href: ""
    },
    {
      title: "link2",
      href: ""
    }
  ]

  return (
    <div className="p-3 bg-secondary flex justify-between items-center">
      <div>
        <img src="images/Hero_Logo.png" className="w-[180px]" />
      </div>
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            {
              navbarLinks.map((links) => (
                <NavigationMenuItem key={links.title}>
                  <NavigationMenuLink className="bg-secondary text-secondary-foreground" asChild>
                    <Link href={`${links.href}`}>{links.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))
            }
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
