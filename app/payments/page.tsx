'use client';


export default function Pay(){
async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const req = await fetch("/api/paystack", {method:"POST",body:JSON.stringify({
        email: form.get("email") as string,
        amount: form.get("amount") as string,
    })});
    const test:{url: {data:{authorization_url:string}}}=await req.json();
    window.location.href=`${test.url.data.authorization_url}`;
    


}
return (<div className="bg-green-900/20  bg-cover m-4">
    <h1 className="text-center text-xg font-bold p-6">Donate</h1>
<form className="mx-auto p-4  w-64 " onSubmit={handleSubmit}>
    <div className="">
        <label htmlFor="email">Email</label>
        <input className="outline-1  p-4 m-6 bg-white" type="email" required id="email" name="email" />
    </div>
    <div>
        <label htmlFor="amount">Amount</label>
        <input type="number" required name="amount" id="amount"  className="outline-1 bg-white p-4 m-6"/>
    </div>
    <div>
        <input className="bg-black text-white rounded-lg m-4 p-4" type="submit" value={`Donate`} />
    </div>
</form>
</div>);
}