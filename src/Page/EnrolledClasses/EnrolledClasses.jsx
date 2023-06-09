import ClassCard from '../Shared/ClassCard/ClassCard';
import Loading from '../../Components/Loading/Loading';
import useEnrolled from '../../hook/useEnrolled';

const EnrolledClasses = () => {
    const [enrolledClass,,isLoading]= useEnrolled()

    if(isLoading){
        return <Loading/>
    }
   
    return (
        <div>
            <ClassCard data={enrolledClass} />
        </div>
    );
};

export default EnrolledClasses;