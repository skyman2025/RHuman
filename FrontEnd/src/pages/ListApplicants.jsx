import React from "react";
import DropDownMenu from "../components/DropDownMenu";
import ListaAspirantes from "../components/ListaAspirantes";
import PostulateSection from "../components/PostulateSection";

class ListApplicants extends React.Component {
    state = {
        selectedProfession: new URLSearchParams(window.location.search).get('profession') || "Todos"
    };

    handleProfessionChange = (profession) => {
        this.setState({ selectedProfession: profession });
    };

    render() {
        return (
            <div>
                <DropDownMenu 
                    onChange={this.handleProfessionChange} 
                    initialSelection={this.state.selectedProfession}
                />
                <ListaAspirantes selectedProfession={this.state.selectedProfession} />
                <PostulateSection/>
            </div>
        )
    }
}

export default ListApplicants;