import Layout from "@/app/components/Layout";
import Card from "@/app/components/common/Card";
import BudgetChart from "@/app/components/BudgetChart";
import ExpensePieChart from "@/app/components/ExpensePieChart";
import BudgetOverview from "@/app/components/BudgetOverview";
import RecentTransactions from "@/app/components/RecentTransactions";
import { FaWallet, FaDollarSign, FaChartLine, FaPiggyBank } from "react-icons/fa";

export default function DashboardPage() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold text-black mb-6">Dashboard</h2>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Current Balance" amount="$5400.00" percentage="12%" isIncrease={true} icon={<FaWallet />} borderColor="border-blue-500" />
        <Card title="Total Income" amount="$8200.00" percentage="8%" isIncrease={true} icon={<FaChartLine />} borderColor="border-green-500" />
        <Card title="Total Expenses" amount="$2800.00" percentage="3%" isIncrease={false} icon={<FaDollarSign />} borderColor="border-red-500" />
        <Card title="Savings Rate" amount="66%" percentage="5%" isIncrease={true} icon={<FaPiggyBank />} borderColor="border-purple-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <BudgetChart />
        <ExpensePieChart />
      </div>


      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <RecentTransactions />

        {/* Budget Overview */}
        <BudgetOverview />
      </div>
    </Layout>
  );
}
