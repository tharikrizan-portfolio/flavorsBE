import React from 'react';

const SignUp = React.lazy(() => import('./Views/Authentication/SignUp/SignUp'));
const Signin1 = React.lazy(() => import('./Views/Authentication/SignIn/SignIn'));


const route = [
    { path: '/auth/signup', exact: true, name: 'Signup 1', component: SignUp },
    { path: '/auth/signin', exact: true, name: 'Signin 1', component: Signin1 },

];

export default route;
