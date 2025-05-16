import { useEffect, useState } from "react";

function App() {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const itemPerPage=10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let resp = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        let data = await resp.json();

        if (data) {
          setTableData(data);
          setPage(1)
          console.log(data);
        } else {
          console.log("error occured");
        }
      } catch (error) {
        alert("failed to fetch data");
    
      }
    };

    fetchData();
  }, []);

  const totalPages=Math.ceil(tableData.length/itemPerPage);
  const startIndex=(page-1)*10;
  const lastIndex=startIndex+itemPerPage;
  const currentData=tableData.slice(startIndex,lastIndex);

//   const handlePreviousButton = () => {
//     if (page != 1) {
//       setPage((prev)=>Math.max(prev-1,1));
//     }
//   };

//   const handleNextButton = () => {
//   setPage((prev) => Math.min(prev + 1, totalPages));
// };

const handleNextButton = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousButton = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center" }}>Employee Data Table</h1>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            borderBottom: "2px solid green",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "green", color: "white" }}>
              <th style={{ border: "1px solid gray", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid gray", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid gray", padding: "8px" }}>
                Email
              </th>
              <th style={{ border: "1px solid gray", padding: "8px" }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((data) => {
              return (
                <tr key={data.id}>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {data.id}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {data.name}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {data.email}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {data.role}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

      {/*<--------pagination controls------->*/} 

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            gap: "10px",
          }}
        >
          <button
            type="button"
            onClick={handlePreviousButton}
            disabled={page==1}
            style={{
              width: "80px",
              height: "30px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: page === 1 ? "gray" : "green",
              color: "white",
              cursor:page==1?"not-allowed":"pointer"
            }}
          >
            Previous
          </button>
          <p
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "green",
              textAlign: "center",
               lineHeight: "40px",
              color: "white",
              borderRadius: "6px",
              margin:0,
            }}
          >
            {page}
          </p>
          <button
            type="button"
            onClick={handleNextButton}
            disabled={page==totalPages}
            style={{
              width: "80px",
              height: "30px",
              border: "none",

              borderRadius: "6px",
              backgroundColor: page<totalPages?"green":"gray",
              color: "white",
              cursor:page<totalPages?"pointer":"not-allowed",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
