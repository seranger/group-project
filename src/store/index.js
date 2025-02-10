import { createStore } from 'vuex'


/* eslint-disable */
//1 make a function to fetch data
//2 check data that was fetched
//3 use mutations to set state
//4 go to view and run the action(dispatch) in a mounted lifecycle hook
//5 check the state
//6 use a v-for to preview data
export default createStore({
  state: {
    //3.1 -make placeholder for data
    employees:null,
    attendance:null,
    leaveRequests:null,
    payroll:null
  },
  getters: {
  },
  mutations: {
    //3.2
    setEmployees(state, employees){
      state.employees = employees
    },
    setAttendance(state, attendance){
      state.attendance = attendance
    },
    setLeaveRequests(state, leaveRequests){
      state.leaveRequests = leaveRequests
    },
    setPayroll(state, payroll){
      state.payroll = payroll
    }
  },
  actions: {
    //1 make function to fetch data
    async getEmployees(context, payload){
      try {
        
        // let data = await (await  fetch('API URL/employees')).json
        let data = await  fetch('http://localhost:3000/employees')
        let info = await  data.json()
        //2 
        console.log(info)
        //3.3 //name of mutation, actual data from api
        context.commit('setEmployees',info)
      } catch (error) {
        console.error('Error fetching employees:', error);

      }
    },

    async getSingleEmployee(context, payload){
      let data = await  fetch('http://localhost:3000/employees/'+payload)
      let info = await  data.json()
      //2 
      console.log(info)
      //3.3 //name of mutation, actual data from api
      context.commit('setEmployees',info)
    },

    //1
    async deleteEmployee(context, payload){
     await fetch('http://localhost:3000/employees/'+ payload,{
        method:'DELETE'
      })
      location.reload()
    },
    async addEmployee(context, payload){
      await fetch('http://localhost:3000/employees',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)
      })
      location.reload()
    },    
    async updateEmployee(context, payload){
      await fetch('http://localhost:3000/employees/'+ payload.employeeId,{
        method:'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)
      })
      location.reload()
    },

    async getAllAttendance(context, payload){
      // let data = await (await  fetch('API URL/employees')).json
      let data = await  fetch('http://localhost:3000/attendance')
      let info = await  data.json()
      //2 
      console.log(info)
      //3.3 //name of mutation, actual data from api
      context.commit('setAttendance',info)
    },

    async getSingleAttendance(context, payload){
      let data = await  fetch('http://localhost:3000/attendance/'+payload)
      let info = await  data.json()
      //2 
      console.log(info)
      //3.3 //name of mutation, actual data from api
      context.commit('setAttendance',info)
    },

    async deleteAttendance(context, payload){
      await fetch('http://localhost:3000/attendance/'+ payload,{
        method:'DELETE'
      })
      location.reload()
    },

    async addAttendance(context, payload){
      await fetch('http://localhost:3000/attendance',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)
      })
      location.reload()
    },

    // In Vuex store (store.js)

    async updateAttendance(context, payload) {
      try {
          // Make a PATCH request to the backend API
          const response = await fetch(`http://localhost:3000/attendance/${payload.id}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
          });
  
          if (response.ok) {
              // If the update is successful, update the state without reloading the page
              context.commit('setAttendance', payload);  // Update the attendance data in the store
          } else {
              throw new Error('Failed to update attendance');
          }
      } catch (error) {
          console.error('Error updating attendance:', error);
          throw new Error('Failed to update attendance');
      }
  },
  

    async getAllLeaveRequests(context, payload){
      // let data = await (await  fetch('API URL/employees')).json
      let data = await  fetch('http://localhost:3000/leaveRequests')
      let info = await  data.json()
      //2 
      console.log(info)
      //3.3 //name of mutation, actual data from api
      context.commit('setLeaveRequests',info)
    },

    async getSingleLeaveRequests(context, payload){
      let data = await  fetch('http://localhost:3000/leaveRequests/'+payload)
      let info = await  data.json()
      //2 
      console.log(info)
      //3.3 //name of mutation, actual data from api
      context.commit('setLeaveRequests',info)
    },

    async deleteLeaveRequests(context, payload){
      await fetch('http://localhost:3000/leaveRequests/'+ payload,{
        method:'DELETE'
      })
      location.reload()
    },

    async addLeaveRequests(context, payload){
      await fetch('http://localhost:3000/leaveRequests',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)
      })
      location.reload()
    },

    async updateLeaveRequests(context, payload) {
      try {
          // Make a PATCH request to the backend API
          const response = await fetch(`http://localhost:3000/leaveRequests/${payload.id}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
          });
  
          if (response.ok) {
              // If the update is successful, update the state without reloading the page
              context.commit('setLeaveRequests', payload);  // Update the leaveRequests data in the store
          } else {
              throw new Error('Failed to update leave request');
          }
      } catch (error) {
          console.error('Error updating leave request:', error);
          throw new Error('Failed to update leave request');
      }
  },
  
    async getAllPayroll(context, payload){
      // let data = await (await  fetch('API URL/employees')).json
      let data = await  fetch('http://localhost:3000/payroll')
      let info = await  data.json()
      //2 
      console.log(info)
      //3.3 //name of mutation, actual data from api
      context.commit('setPayroll',info)
    },

    async getSinglePayroll(context, payload){
      let data = await  fetch('http://localhost:3000/payroll/'+payload)
      let info = await  data.json()
      //2 
      console.log(info)
      //3.3 //name of mutation, actual data from api
      context.commit('setPayroll',info)
    },

    async deletePayroll(context, payload){
      await fetch('http://localhost:3000/payroll/'+ payload,{
        method:'DELETE'
      })
      location.reload()
    },

    async addPayroll(context, payload){
      await fetch('http://localhost:3000/payroll',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)
      })
      location.reload()
    },

    async updatePayroll(context, payload){
      await fetch('http://localhost:3000/payroll/'+ payload.id,{
        method:'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload)
      })
    }
        
  }, 
  modules: {
  }
})
