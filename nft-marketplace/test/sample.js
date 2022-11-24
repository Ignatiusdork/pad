const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace", function () {

  it("Should create and excute sales ", async function () {
    const Marketplace = await ethers.getContractFactory("MarketPlace")
    const market = await Marketplace.deploy()
    await market.deployed()
    const marketplaceAddress = Marketplace.address

    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(marketplaceAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits("100", "ether")

    /* create two tokens */

    await nft.createToken("https://www.mytokenlocation.com")
    await nft.createToken("https://www.mytokenlocation2.com")
   
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice})
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice})

    const [_, buyerAddress] = await ethers.getSigners()

    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})

    const items = await market.fetchMarketItems()

    console.log("items: ", items)

  });
  
});
