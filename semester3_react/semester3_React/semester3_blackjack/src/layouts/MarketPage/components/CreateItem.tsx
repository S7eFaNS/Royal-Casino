/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import AddSkinRequest from '../../../models/AddSkinRequest';
import { useFetchSkinsCreate } from '../../Utils/API_Calls/Skins/FetchSkinsCreate';
import { toast } from 'react-toastify';

export const CreateItem = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState<any>(null);

    const createSkin = async () => {
        const skinDetails: AddSkinRequest = {
            name: name,
            price: price,
            description: description,
            img: selectedImage
        };

        if (!name || !price || !description || !selectedImage) {
            toast.error('All field must be filled', { theme: 'colored' });
            return;
        }

        const isCreated = await useFetchSkinsCreate(skinDetails);

        if (isCreated) {
            toast.success('Skin added successfully', { theme: 'colored' });
        } else {
            toast.error('Error adding skin', { theme: 'colored' });
        }
    }
    async function base64ConversionForImages(e: any){
        if(e.target.files[0]){
            getBase64(e.target.files[0]);
        }
    }

    function getBase64(file: any){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            setSelectedImage(reader.result);
        }
        reader.onerror = function (error) {
            console.log("Erorr: ", error);
        }
    }
    

    return (
        <div className='container mt-5 mb-5'>
            <div className='card'>
                <div className='card-header' style={{backgroundColor:"#4f1098", color:"white"}}>
                    Add a new skin
                </div>
                <div className='card-body' style={{backgroundColor:"grey", color:"white"}}>
                    <form method='POST'>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>Name</label>
                                <input type="text" className='form-control' name='name' required 
                                    onChange={e => setName(e.target.value)} value={name} style={{backgroundColor:"#dbd5e6"}} />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Price </label>
                                <input type="number" className='form-control' name='price' required 
                                    onChange={e => setPrice(Number(e.target.value))} value={price} style={{backgroundColor:"#dbd5e6"}}/>
                            </div>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>Description</label>
                            <textarea className='form-control' id='exampleFormControlTextarea1' rows={3} 
                                onChange={e => setDescription(e.target.value)} value={description} style={{backgroundColor:"#dbd5e6"}}></textarea>
                        </div>
                        <input type='file' onChange={e => base64ConversionForImages(e)}/>
                        <div>
                            <button type='button' className='btn btn-primary mt-3' onClick={createSkin} style={{backgroundColor:"#4f1098", color:"white"}}>
                                Add Skin
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}