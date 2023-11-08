import React from 'react'

const ResetPassword = () => {
  return (
    <div className="forgot-password-wrapper py-5  bg-yellow-400">
        <div className="flex items-center " style={{minHeight: "100vh"}}>
 
        <div className="my-5 w-1/4 rounded-md overflow-hidden p-5 bg-white mx-auto">
            <form className="flex flex-col items-center gap-3" action="">
                <h4 className='text-xl font-medium'>Reset Password</h4>
                <h6 className='text-sm font-normal text-center'>Enter your new password</h6>
                <input className="text-gray-400 input-outline rounded-md px-2 py-1 w-full border-2 border-gray-200" type="password" placeholder="Enter Password" id="newpass"/>
                <input className="text-gray-400 input-outline rounded-md px-2 py-1 w-full border-2 border-gray-200" type="password" placeholder="Conform Password" id="conformpass"/>
                <button type="submit" className="w-full h-fit py-2 rounded-md bg-yellow-400">Reset Password</button>
            </form>


        </div>
                 
        </div>
    </div>
  )
}

export default ResetPassword
