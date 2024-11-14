
import {Link} from 'react-router-dom';

const GridSquare = ({businessObject, filteredObject}) => {


    let name = (businessObject.name !== undefined && businessObject.name !== null) ? businessObject.name : '';
    let color = (businessObject.color !== undefined && businessObject.color !== null) ? businessObject.color : 'bg-stone-200';
    let state = (businessObject.state !== undefined && businessObject.state !== null) ? businessObject.state : '';
    let street = (businessObject.street !== undefined && businessObject.street !== null) ? businessObject.street : '';
    let town = (businessObject.town !== undefined && businessObject.town !== null) ? businessObject.town : '';
    let zip = (businessObject.zip !== undefined && businessObject.zip !== null) ? businessObject.zip : '';
    let image = (businessObject.image !== undefined && businessObject.image !== null) ? businessObject.image : '#';
    let id = (businessObject.id !== undefined && businessObject.id !== null) ? businessObject.id : '';

    function getHeight(){
        if(filteredObject !== null){
            if(filteredObject.filterMatches > 0){
                return 'h-84.5';
            }
        }
        return 'h-72.5';
    }

    function getFilterTop(){
        if(filteredObject !== null){
            if(filteredObject.filterMatches > 0){
                return [
                    <div className={`flex flex-col w-full h-12 ${color}`}>
                        <h1 className='text-sm mt-1 ml-1'>{`Filter Matches: ${filteredObject.filterMatches}`}</h1>
                        <h1 className='text-sm ml-1'>{`Total Menu Items Matched: ${filteredObject.totalMatches}`}</h1>
                    </div>
                ];
            }
        }
        return [];  
    }

    //was w-1/3

    return (
        <div className={`flex flex-row justify-center w-72 ${getHeight()} `}>
            <div className={`w-9/10 h-full hover:shadow-2xl cursor-pointer border-x border-t border-b-2 border-solid border-stone-400 hover:border-b-4 hover:border-l-4 hover:border-stone-500`}>
                <Link to={`/businessmenu/${id}`}>
                    <div className="h-full w-full">
                        {getFilterTop()}
                        <div className={`flex flex-row justify-center items-center h-14 w-full px-1 ${color}`}>
                            {name}
                        </div>
                        <div className="h-44 w-full bg-amber-950">
                            <img className='h-full w-full object-contain' id="selectedImage" src={image} alt="No Image Selected"></img>
                        </div>
                        <div className={`flex flex-row justify-center items-center h-14 w-full px-1 ${color}`}>
                            {`${street} ${town} ${state} ${zip}`}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
 
export default GridSquare;