import { NextResponse } from 'next/server';
import { ref, set } from 'firebase/database';
import { db2 } from 'src/app/firebase.js'; // adjust path if needed

export async function POST(req: Request) {
  try {
    const { uid, email, firstName, surname, dob, gender, createdAt } = await req.json();

    await set(ref(db2, 'users/' + uid), {
      email,
      firstName,
      surname,
      dob,
      gender,
      createdAt,
    });

    return NextResponse.json({ message: 'User saved successfully' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
  }
}
