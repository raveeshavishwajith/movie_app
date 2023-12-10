import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import {
  upComingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImagePath,
} from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const {width, height} = Dimensions.get('window');

const getNowPlayingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.log(
      ' Something went wrong in getNowPlayingMoviesList Function',
      error,
    );
  }
};

const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(upComingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      ' Something went wrong in getUpcomingMoviesList Function',
      error,
    );
  }
};

const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      ' Something went wrong in getPopularMoviesList Function',
      error,
    );
  }
};

const HomeScreen = ({navigation}: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] =
    useState<any>(undefined);
  const [upComingMoviesList, setUpComingMoviesList] = useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList([
        {id: 'dummy1'},
        ...tempNowPlaying,
        {id: 'dummy2'},
      ]);

      let tempUpcoming = await getUpcomingMoviesList();
      setUpComingMoviesList(tempUpcoming.results);

      let tempPopular = await getPopularMoviesList();
      setPopularMoviesList(tempPopular.results);
    })();
  }, []);

  const searchMoviesFunction = (searchText: string) => {
    navigation.navigate('Search', {searchText: searchText});
  };

  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    upComingMoviesList == undefined &&
    upComingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />
        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar hidden />
      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>

      <CategoryHeader title={'Now Playing'} />
      <FlatList
        data={nowPlayingMoviesList}
        bounces={false}
        snapToInterval={width * 0.7 + SPACING.space_36}
        keyExtractor={(item: any) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => {
          if (!item.original_title) {
            return (
              <View
                style={{
                  width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                }}
              />
            );
          }
          return (
            <MovieCard
              shouldMarginatedAtEnd={true}
              cardFuntion={() => {
                navigation.push('MovieDetails', {movieId: item.id});
              }}
              cardWidth={width * 0.7}
              isFirst={index == 0 ? true : false}
              isLast={index == nowPlayingMoviesList.length - 1 ? true : false}
              title={item.original_title}
              imagePath={baseImagePath('w780', item.poster_path)}
              genre={item.genre_ids.slice(1, 4)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          );
        }}
      />

      <CategoryHeader title={'Popular'} />
      <FlatList
        data={popularMoviesList}
        bounces={false}
        keyExtractor={(item: any) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
            shouldMarginatedAtEnd={true}
            cardFuntion={() => {
              navigation.push('MovieDetails', {movieId: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == popularMoviesList.length - 1 ? true : false}
          />
        )}
      />

      <CategoryHeader title={'Upcoming'} />
      <FlatList
        data={upComingMoviesList}
        bounces={false}
        keyExtractor={(item: any) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
            shouldMarginatedAtEnd={true}
            cardFuntion={() => {
              navigation.push('MovieDetails', {movieId: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upComingMoviesList.length - 1 ? true : false}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_38,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});

export default HomeScreen;
