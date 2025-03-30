import React from 'react';
import {redirect} from 'next/navigation';

export default function HomePage() {

  // Redirect to the dashboard page
  // when the user accesses the root URL
  redirect("/login");
 
}
