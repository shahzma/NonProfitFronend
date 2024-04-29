import React from 'react';
import TaskCard from './TaskCard';
import ProposalsStats from './ProposalsStats';

const DashboardPage = () => (
  <div>
    <h1>Dashboard</h1>
    <section className="tasks">
      <TaskCard title="Review proposal" dueDate="August 8, 2024" />
    </section>
    <section className="proposals-stats">
      <ProposalsStats />
    </section>
  </div>
);

export default DashboardPage;
