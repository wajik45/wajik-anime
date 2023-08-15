export default (setRefresh: any, setError: any) => {
   window.addEventListener("online", () => {
      setError(null);
      setRefresh((prev: number) => prev + 1);
   });
};
