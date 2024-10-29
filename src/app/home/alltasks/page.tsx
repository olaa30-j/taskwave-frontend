import TasksTable from "@/app/components/alltasks/TasksTable";

const page = () => {
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TasksTable />
      </div>
    </>
  );
};

export default page;
