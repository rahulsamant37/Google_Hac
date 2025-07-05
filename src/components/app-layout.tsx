
'use client';

import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Languages,
  LayoutDashboard,
  BrainCircuit,
  Paintbrush,
  FileText,
  WifiOff,
  Settings,
  HelpCircle,
  Bell,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/localize', label: 'Content Localizer', icon: Languages },
  { href: '/worksheets', label: 'Worksheet Generator', icon: FileText },
  { href: '/assist', label: 'AI Assistant', icon: BrainCircuit },
  { href: '/visual-aids', label: 'Visual Aid Designer', icon: Paintbrush },
  { href: '/offline', label: 'Offline Content', icon: WifiOff },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/help', label: 'Help & Tutorials', icon: HelpCircle },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="p-2 bg-primary rounded-lg flex items-center justify-center">
        <GraduationCap className="h-6 w-6 text-primary-foreground" />
      </div>
      <div className="hidden md:block">
        <span className="text-xl font-bold tracking-tight text-foreground">
          Sahayak
        </span>
      </div>
    </Link>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // NOTE: We can't render anything on the server for this component
    // because it depends on the screen size.
    return null;
  }

  return (
    <SidebarProvider>
      <div className="h-screen flex flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-4 md:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Logo />
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="outline" size="sm" className="gap-2 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Online
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 border-2 border-background"></span>
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage
                    src="https://placehold.co/100x100.png"
                    alt="User avatar"
                    data-ai-hint="teacher avatar"
                  />
                  <AvatarFallback>T</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
            <Sidebar collapsible="icon" className="border-r">
                <SidebarContent className="p-2">
                  <div className="flex flex-col h-full">
                    <SidebarNav items={navItems} />
                  </div>
                </SidebarContent>
            </Sidebar>
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-secondary/40">
                {children}
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
