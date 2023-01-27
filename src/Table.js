import './Table.css';

const Table = (props) => {

const {
    tableData: accountdataList
 } = props;

return (
  <div className="tableData">
  <table>
      <tr>
        <th>Number</th>
        <th>Account Name</th>
        <th>Country code</th>
      </tr>
          <tr>
            <td>{accountdataList.acctNo}</td>
            <td>{accountdataList.acctName}</td>
            <td>{accountdataList.countryCd}</td>
      </tr>
        </table> 
      </div>
  )
}

export default Table;