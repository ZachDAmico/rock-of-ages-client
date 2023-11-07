import { useEffect } from "react";
// showAll is now passed as prop and needed here
// first step is to make sure right info from API
// fetchRocks is function that is getting that info
export const RockList = ({ rocks, fetchRocks, showAll }) => {
  useEffect(() => {
    // need fetchRocks() invoked here to show up on page upon render, but don't forget it's defined in ApplicationViews as fetch
    // so now that fetch component needs to know if it's fetching all rocks or just auth user's
    // changing fetch URL depending on whether showAll is true or false
    // that info from fetchRocks function call needs to be passed UP to fetch so showAll is needed as argument here
    // dependency array is originally empty so the fetchRocks only happens on initial render and not when the page/url changes from mine to allrocks
    //  so need to acknowledge prop has changed so fetchRock happens when route changes
    fetchRocks(showAll);
  }, [showAll]);

  const displayRocks = () => {
    if (rocks && rocks.length) {
      return rocks.map((rock) => (
        <div
          key={`key-${rock.id}`}
          className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50"
        >
          <div>
            {rock.name} ({rock.type.label})
          </div>
          <div>
            In the collection of {rock.user?.first_name} {rock.user?.last_name}
          </div>
          {/* without conditional, delete button shows up on all rocks as well and we want user to only have ability to delete own rocks */}
          {/* checking to see if showAll is true or false and what to render in both cases */}
          {/* when showAll is true, we want to show no delete button, when showAll is false, we want the button, so the entire <div/> containing button moved to the "or" */}
          {showAll ? (
            ""
          ) : (
            <div>
              <button
                onClick={async () => {
                  // delete needs to be single rock url, not all rocks
                  // rock variable above in map is holding current rock, can use rock.id
                  const response = await fetch(
                    ` http://localhost:8000/rocks/${rock.id}`,
                    {
                      method: "Delete",
                      headers: {
                        Authorization: `Token ${
                          JSON.parse(localStorage.getItem("rock_token")).token
                        }`,
                      },
                    }
                  );

                  // with code above, delete with work, but auto rerender does not, hence code below
                  if (response.status === 204) {
                    // needs showAll again to make sure it targets correct list to render
                    fetchRocks(showAll);
                  }
                }}
                className="border border-solid bg-red-700 text-white p-1"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ));
    }

    return <h3>Loading Rocks...</h3>;
  };

  return (
    <>
      <h1 className="text-3xl">Rock List</h1>
      {displayRocks()}
    </>
  );
};
