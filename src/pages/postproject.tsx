import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from '../firebase';
export default function PostProject({clientId}) {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [projectSubcategory, setProjectSubcategory] = useState("");
  const [budget, setBudget] = useState("");
const [skills,setSkills]=useState("")
const [clientname,setClientName]=useState("")
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore(app);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const uid = auth.currentUser.uid;
    const projectData = {
      projectTitle,
      projectDescription,
      projectCategory,
      projectSubcategory,
      budget,
      createdAt: serverTimestamp(),
      uid
    };
    try {
      await addDoc(collection(db, "AllProjects"), {
        Title:projectTitle,
        Budget:budget,
        Category:projectCategory,
        SubCategory:projectSubcategory,
      uid:clientId,
      uploadedBy:clientname,
      Skills:skills,
      Des:projectDescription,
      });
      alert("Project added successfully!");
      setProjectTitle("");
      setProjectDescription("");
      setProjectCategory("");
      setProjectSubcategory("");
      setBudget("");
      router.push({pathname:'/clientdashboard',query:{clientId:clientId}})
    } catch (err) {
      console.log(err);
      alert("Error adding project.");
    }
  };

  return (
    <>
      <Head>
        <title>User Dashboard</title>
        <meta name="description" content="User dashboard for adding projects." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style></style>
      </Head>
      <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-white h-dvh">
  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-300">
        Project title:
      </label>
      <input
        type="text"
        placeholder="Enter project title"
        value={projectTitle}
        onChange={(e) => setProjectTitle(e.target.value)}
        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-300">
        Project description:
      </label>
      <input
        type="text"
        placeholder="Enter project description"
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-300">
        Project category:
      </label>
      <input
        type="text"
        placeholder="Enter project category"
        value={projectCategory}
        onChange={(e) => setProjectCategory(e.target.value)}
        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-300">
        Project subcategory:
      </label>
      <input
        type="text"
        placeholder="Enter project subcategory"
        value={projectSubcategory}
        onChange={(e) => setProjectSubcategory(e.target.value)}
        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-300">
        Project skills separated by comma:
      </label>
      <input
        type="text"
        placeholder="Enter project skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-300">
        Enter Your Name:
      </label>
      <input
        type="text"
        placeholder="Enter your name"
        value={clientname}
        onChange={(e) => setClientName(e.target.value)}
        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-300">
        Budget:
      </label>
      <input
        type="number"
        placeholder="Enter budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
    <div>
      <input
        type="submit"
        value="Submit"
        className="w-full px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
      />
    </div>
  </form>
</div>
              </>
              );
              }
              
              export async function getServerSideProps({ query }) {
              // Here you can add any server-side code you need
              const clientId=query.clientId

              return { props: {clientId} };
              }
              
              
              
              
              
              
