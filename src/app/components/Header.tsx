
// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { cn } from '@/lib/utils';
// import { 
//   LayoutDashboard, 
//   BarChart3, 
//   PieChart,
//   ArrowUpDown, 
//   Menu, 
//   X, 
//   Bell, 
//   User,
//   Search
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
//   SheetClose,
// } from '@/components/ui/sheet';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// const NavLink = ({ href, children, icon, isMobile = false, onClick }: any) => {
//   const location = useLocation();
//   const isActive = location.pathname === href;

//   return (
//     <Link
//       to={href}
//       onClick={onClick}
//       className={cn(
//         'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
//         !isMobile && 'hover:bg-muted',
//         isActive
//           ? 'bg-primary text-primary-foreground hover:bg-primary/90'
//           : 'text-muted-foreground hover:text-foreground'
//       )}
//     >
//       {icon}
//       <span>{children}</span>
//     </Link>
//   );
// };

// const Header = () => {
//   const [isSearchActive, setIsSearchActive] = useState(false);

//   const toggleSearch = () => {
//     setIsSearchActive(!isSearchActive);
//   };

//   const mobileMenuLinks = (onClose: () => void) => (
//     <>
//       <NavLink href="/" icon={<LayoutDashboard className="h-5 w-5" />} isMobile onClick={onClose}>
//         Dashboard
//       </NavLink>
//       <NavLink href="/transactions" icon={<ArrowUpDown className="h-5 w-5" />} isMobile onClick={onClose}>
//         Transactions
//       </NavLink>
//       <NavLink href="/budgets" icon={<BarChart3 className="h-5 w-5" />} isMobile onClick={onClose}>
//         Budgets
//       </NavLink>
//       <NavLink href="/reports" icon={<PieChart className="h-5 w-5" />} isMobile onClick={onClose}>
//         Reports
//       </NavLink>
//     </>
//   );

//   return (
//     <header className="border-b sticky top-0 z-30 bg-background/80 backdrop-blur-lg">
//       <div className="container px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
//         <div className="flex items-center gap-6">
//           <Link to="/" className="flex items-center gap-2">
//             <span className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
//               <span className="font-bold text-primary-foreground">M</span>
//             </span>
//             <span className="font-bold text-xl hidden sm:inline-block">MaaliMunshi</span>
//           </Link>

//           <nav className="hidden md:flex items-center space-x-1">
//             <NavLink href="/" icon={<LayoutDashboard className="h-4 w-4" />}>
//               Dashboard
//             </NavLink>
//             <NavLink href="/transactions" icon={<ArrowUpDown className="h-4 w-4" />}>
//               Transactions
//             </NavLink>
//             <NavLink href="/budgets" icon={<BarChart3 className="h-4 w-4" />}>
//               Budgets
//             </NavLink>
//             <NavLink href="/reports" icon={<PieChart className="h-4 w-4" />}>
//               Reports
//             </NavLink>
//           </nav>
//         </div>

//         <div className="flex items-center gap-2">
//           <div
//             className={cn(
//               'transition-all duration-300 flex items-center bg-muted rounded-lg',
//               isSearchActive ? 'w-64' : 'w-10'
//             )}
//           >
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-10 w-10 text-muted-foreground hover:text-foreground"
//               onClick={toggleSearch}
//             >
//               <Search className="h-5 w-5" />
//             </Button>
//             <input
//               type="text"
//               placeholder="Search..."
//               className={cn(
//                 'bg-transparent border-none outline-none text-sm w-full transition-all duration-300',
//                 isSearchActive ? 'opacity-100 w-full mr-2' : 'opacity-0 w-0'
//               )}
//             />
//           </div>

//           <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
//             <Bell className="h-5 w-5" />
//           </Button>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                 <Avatar className="h-8 w-8">
//                   <AvatarFallback className="bg-primary text-primary-foreground">
//                     U
//                   </AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-56">
//               <DropdownMenuItem>Profile</DropdownMenuItem>
//               <DropdownMenuItem>Settings</DropdownMenuItem>
//               <DropdownMenuItem>Help</DropdownMenuItem>
//               <DropdownMenuItem>Logout</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon" className="md:hidden">
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="w-[250px] sm:w-[300px]">
//               <div className="flex flex-col h-full px-2 py-6">
//                 <div className="flex items-center justify-between mb-8">
//                   <Link to="/" className="flex items-center gap-2">
//                     <span className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
//                       <span className="font-bold text-primary-foreground">M</span>
//                     </span>
//                     <span className="font-bold text-xl">MaaliMunshi</span>
//                   </Link>
//                   <SheetClose asChild>
//                     <Button variant="ghost" size="icon">
//                       <X className="h-5 w-5" />
//                     </Button>
//                   </SheetClose>
//                 </div>

//                 <nav className="flex flex-col space-y-2">
//                   <SheetClose asChild>
//                     {mobileMenuLinks(() => {})}
//                   </SheetClose>
//                 </nav>

//                 <div className="mt-auto px-4 py-4">
//                   <div className="flex items-center gap-3 mb-4">
//                     <Avatar>
//                       <AvatarFallback className="bg-primary text-primary-foreground">
//                         U
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <div className="font-medium">User</div>
//                       <div className="text-sm text-muted-foreground">user@example.com</div>
//                     </div>
//                   </div>
//                   <Button variant="outline" className="w-full justify-center">
//                     <User className="mr-2 h-4 w-4" />
//                     Profile
//                   </Button>
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
