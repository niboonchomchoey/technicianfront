import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import { API_URL } from '../../../../utils/urls';
export default function GoogleAuthCallback() {
  const [auth, setAuth] = useState()

  const router = useRouter()

  useEffect(() => {

    async function fetchData() {
      // const path = 'http://localhost:1337/auth/google/callback'
      const path = `${API_URL}/auth/google/callback`
      console.log(path)
      const query = router.asPath.split('?').pop()
      if (!router) {
        return router.back()
      }
      try {
        const response = await fetch(`${path}?${query}`)
        const user = await response.json()
        setCookie(null, 'user', JSON.stringify(user), {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        })
        router.push('/')
      } catch (err) {
        console.log(err)
      }
      // try {
      //   const response = await fetch('')
      // } catch (error) {

      // }

    }
    fetchData()
  }, [router])
  return (
    <div>
      {/* {auth && (
          <>
            <div>Jwt: {auth.jwt}</div>
            <div>User Id: {auth.user.id}</div>
            <div>Provider: {auth.user.provider}</div>
          </>
        )} */}
    </div>
  )
}