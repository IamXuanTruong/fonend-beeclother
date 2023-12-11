// import React, { useState } from 'react';
// function CreateProduct() {
//     const [productImg,setProductImg] = useState();
//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//           // Đọc tệp ảnh và mã hóa thành base64
//           const reader = new FileReader();
//           reader.onload = (e) => {
//             const base64Image = e.target.result;
//             console.log(base64Image);
//           };
//           reader.readAsDataURL(file);
//         }
//       };
      
//     const handleDATA = () =>{
//         console.log(productImg);
//     }
    

//     return (
//         <>
//             <div className='loginpage'>
//                <input type='file' value={productImg} onChange={handleFileUpload}></input>
//                 <button onClick={handleDATA}>Submit</button>
//             </div>
//         </>
//     );
// }
// export default CreateProduct;
