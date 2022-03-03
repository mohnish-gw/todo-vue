
import gql from 'graphql-tag'



export const gettodolist = gql`
query($userid:String!){
  todo(input:{userid :$userid}){
    status
    _id,
    insert_date,
    work,
    update_date
  }
}
  `
  export const getsortedlist = gql `
  query($userid:String!){
    todo(input:{userid: $userid,sortby:"status"}){
      status
      _id,
      insert_date,
      work,
      update_date
    }
  }
  `


  export const addtask= gql` mutation addtodo($work:String!,$status:String!,$userid:String!,$insert_date:DateTime!,$update_date:DateTime!){
    todoInsert(input:{work:$work,status:$status,userid:$userid,insert_date:$insert_date,update_date:$update_date}){
      response,
       status,
       message,
        error
    }
  }
  `

  export const updatetask = gql `mutation updatestatus($_id:ObjectId!,$status:String!,$work:String!,$update_date:DateTime!){
    todoUpdate(input:{_id:$_id,status:$status,work:$work,update_date:$update_date}){
      response,
      status,
      message,
      error
    }
  }`

  export const deletetask =gql `mutation deletetask($_id:ObjectId !){
    tododelete(input:{_id:$_id}){
      response
      status
      error
      message
    }
  }`
 