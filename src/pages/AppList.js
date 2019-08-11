import React, { Component } from 'react'
import appStoreService from '../services/app-store-service'

class AppList extends Component {
  state = {
    apps: [],
  }

  componentDidMount() {
    appStoreService.getAllApps()
      .then((response)=> {
        console.log(response)
        this.setState({
          apps: response.data.listOfApps,
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleDeleteClick = (id) => {
    const {apps} = this.state;
    appStoreService.deleteOneApp(id)
      .then(() => {
        const filteredApps = apps.filter((singleApp) => {
        return singleApp._id !== id
        })
        this.setState({
          apps: filteredApps,
        })
      })
  }

  render() {
    const {apps} = this.state;
    return (
      <>
        <section className="list-container">
          <h2>List Of Apps</h2>
          {apps.length > 0 ? apps.map((app) => {
            return (
              <article key={app._id} className="app-container">
                <img src={app.image} alt={app.name} height="200"/>
                <h3>{app.name}</h3>
                <p>{app.price}</p>
                <p>{app.date}</p>
                <p>{app.description}</p>
                <button onClick={() => {
                  this.handleDeleteClick(app._id)
                }}>X</button>
              </article>
            )
          }) : <p>Loading...</p>}
      </section>
      </>
    )
  }
}

export default AppList;
