
// import React from 'react';
// import { cn } from '@/lib/utils';

// export interface BudgetCardProps {
//   id: string;
//   category: string;
//   allocated: number;
//   spent: number;
//   icon?: React.ReactNode;
//   color?: string;
//   onEdit?: (id: string) => void;
// }

// const BudgetCard = ({ category, allocated, spent, icon, color = 'finance-blue', onEdit }: BudgetCardProps) => {
//   const percentSpent = Math.min(Math.round((spent / allocated) * 100), 100);
//   const remaining = allocated - spent;
  
//   // Determine progress bar color based on percentage spent
//   let progressColor = `bg-finance-green-DEFAULT`;
  
//   if (percentSpent > 80) {
//     progressColor = `bg-finance-red-DEFAULT`;
//   } else if (percentSpent > 60) {
//     progressColor = `bg-finance-yellow-DEFAULT`;
//   }

//   return (
//     <div className="glass-card p-5 animate-fade-in-up">
//       <div className="flex justify-between items-center mb-3">
//         <div className="flex items-center gap-2">
//           {icon && (
//             <div className={cn(`bg-${color}-light p-2 rounded-lg text-${color}-dark`)}>
//               {icon}
//             </div>
//           )}
//           <h3 className="font-medium">{category}</h3>
//         </div>
//         <span 
//           className={cn(
//             "text-xs font-medium px-2 py-1 rounded-full",
//             percentSpent > 90 ? "bg-finance-red-light text-finance-red-dark" : 
//             percentSpent > 70 ? "bg-finance-yellow-light text-finance-yellow-dark" :
//             "bg-finance-green-light text-finance-green-dark"
//           )}
//         >
//           {percentSpent}%
//         </span>
//       </div>
      
//       <div className="budget-progress mb-2">
//         <div 
//           className={cn("budget-progress-bar", progressColor)} 
//           style={{ width: `${percentSpent}%` }}
//         />
//       </div>
      
//       <div className="flex justify-between text-sm mt-2">
//         <span className="text-muted-foreground">
//           ${spent.toFixed(2)} <span className="text-xs">spent</span>
//         </span>
//         <span className={remaining >= 0 ? "text-finance-green-dark" : "text-finance-red-dark"}>
//           ${Math.abs(remaining).toFixed(2)} <span className="text-xs">{remaining >= 0 ? 'left' : 'over'}</span>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default BudgetCard;
